import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as utils from './utils';
import * as CBOR from './cbor';
import * as Helper from './helpers';
import { decode } from './base64url-arraybuffer';
import { BigNumber } from 'ethers';
import crypto from 'crypto';
import { ECDSASigValue } from '@peculiar/asn1-ecc';
import { AsnParser } from '@peculiar/asn1-schema';
import base64url from 'base64url';

function getAlgoName(num: any) {
  switch (num) {
    case -7:
      return 'ES256';
    // case -8 ignored to to its rarity
    case -257:
      return 'RS256';
    default:
      throw new Error(`Unknown algorithm code: ${num}`);
  }
}

const CreatePassKey = () => {
  const { chromeid, name: username = 'test' } = useParams();

  useEffect(() => {
    const createPassKeySync = async () => {
      try {
        const credential = await navigator.credentials.create({
          publicKey: {
            rp: {
              name: 'Trampoline-Example',
            },
            user: {
              id: Uint8Array.from(Buffer.from(uuidv4, 'hex')),
              name: username,
              displayName: username,
            },
            challenge: Uint8Array.from(Buffer.from(uuidv4, 'hex')),
            pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
          },
        });

        if (!credential) return;

        let attestationObject = CBOR.decode(
          (credential as any).response.attestationObject,
          undefined,
          undefined
        );
        let authData = Helper.parseAuthData(attestationObject.authData);
        let pubk = CBOR.decode(
          authData.COSEPublicKey.buffer,
          undefined,
          undefined
        );

        const q0 = BigNumber.from(pubk['-2']);
        const q1 = BigNumber.from(pubk['-3']);

        const credentialId = credential.id;

        await chrome.runtime.sendMessage(chromeid, { credentialId, q0, q1 });
      } catch (e) {
        console.log(e);
        await chrome.runtime.sendMessage(chromeid, 'Denied');
      }
      setTimeout(() => {
        window.close();
      }, 100);
    };

    createPassKeySync();
  }, [username, chromeid]);

  return (
    <CircularProgress
      size={24}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-12px',
        marginLeft: '-12px',
      }}
    />
  );
};

function toHash(data: crypto.BinaryLike, algo = 'SHA256') {
  return crypto.createHash(algo).update(data).digest();
}

function shouldRemoveLeadingZero(bytes: Uint8Array): boolean {
  return bytes[0] === 0x0 && (bytes[1] & (1 << 7)) !== 0;
}

const RequestSign = () => {
  const { chromeid, requestId = '', credentialId = '' } = useParams();

  useEffect(() => {
    const requestSignSync = async () => {
      console.log(
        requestId,
        Uint8Array.from(requestId, (c) => c.charCodeAt(0))
      );
      try {
        const publicKeyCredential = await navigator.credentials.get({
          publicKey: {
            challenge: Uint8Array.from(requestId, (c) => c.charCodeAt(0)),
            timeout: 60000,
            userVerification: 'required',
            allowCredentials: [
              {
                id: decode(credentialId),
                type: 'public-key',
                // transports: ['internal'],
              },
            ],
          },
        });

        if (!publicKeyCredential)
          throw new Error('publicKeyCredential is null');

        console.log(publicKeyCredential);

        const newCredentialInfo =
          Helper.publicKeyCredentialToJSON(publicKeyCredential);

        console.log(newCredentialInfo, '-------');

        const parsedSignature = AsnParser.parse(
          base64url.toBuffer(newCredentialInfo.response.signature),
          ECDSASigValue
        );

        let rBytes = new Uint8Array(parsedSignature.r);
        let sBytes = new Uint8Array(parsedSignature.s);

        if (shouldRemoveLeadingZero(rBytes)) {
          rBytes = rBytes.slice(1);
        }

        if (shouldRemoveLeadingZero(sBytes)) {
          sBytes = sBytes.slice(1);
        }

        const signature = [
          '0x' + Buffer.from(rBytes).toString('hex'),
          '0x' + Buffer.from(sBytes).toString('hex'),
        ];

        console.log(signature);

        await chrome.runtime.sendMessage(chromeid, { signature });
      } catch (e) {
        console.log(e);
        await chrome.runtime.sendMessage(chromeid, 'Denied');
      }
      setTimeout(() => {
        window.close();
      }, 100);
    };

    requestSignSync();
  }, [chromeid, requestId, credentialId]);

  return (
    <CircularProgress
      size={24}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-12px',
        marginLeft: '-12px',
      }}
    />
  );
};

const App = () => {
  //   useEffect(() => {
  //     const getCreden;

  //     const credential = await navigator.credentials.get({
  //       publicKey: {
  //         // Set the WebAuthn credential to use for the assertion
  //         allowCredentials: [
  //           {
  //             id: decodedId,
  //             type: 'public-key',
  //           },
  //         ],
  //         challenge: actualChallenge,
  //         // Set the required authentication factors
  //         userVerification: 'required',
  //       },
  //     });

  //   }, []);

  return (
    <Routes>
      <Route path="/create-new/:chromeid/:name" element={<CreatePassKey />} />
      <Route
        path="/request-sign/:chromeid/:requestId/:credentialId"
        element={<RequestSign />}
      />
    </Routes>
  );
};

export default App;
