import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as utils from './utils';

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

        const registration = {
          username: username,
          credential: {
            id: credential.id,
            publicKey: utils.toBase64url(credential.response.getPublicKey()),
            algorithm: getAlgoName(credential.response.getPublicKeyAlgorithm()),
          },
          authenticatorData: utils.toBase64url(
            credential.response.getAuthenticatorData()
          ),
          clientData: utils.toBase64url(credential.response.clientDataJSON),
        };

        console.log(window.opener.postMessage);

        console.log(chromeid, username);

        chrome.runtime.sendMessage(chromeid, registration);

        await window.opener.postMessage(registration);
      } catch (e) {
        console.log(e);
        await window.opener.postMessage('Denied');
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
    </Routes>
  );
};

export default App;
