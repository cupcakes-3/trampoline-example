import {
  Button,
  CardActions,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useAccount, useConnect, useSignMessage } from 'wagmi';
import { EthersTransactionRequest } from '../../../Background/services/types';
import useAccountApi from '../../useAccountApi';

const Transaction = ({
  transaction,
  onComplete,
}: {
  transaction: EthersTransactionRequest;
  onComplete: (
    modifiedTransaction: EthersTransactionRequest,
    context: any
  ) => void;
}) => {
  const { result, loading, callAccountApi } = useAccountApi();

  useEffect(() => {
    const listenToMessageEvent = ({ newCredentialInfo }: any, sender: any) => {
      if (
        sender.url.includes('http://localhost:3000/iframe.html#/request-sign')
      ) {
        console.log(newCredentialInfo, 'newCredentialInfo');
        onComplete(transaction, { newCredentialInfo });
      }
    };

    window.addEventListener('message', listenToMessageEvent);

    chrome.runtime.onMessageExternal.addListener(listenToMessageEvent);

    return () =>
      chrome.runtime.onMessageExternal.removeListener(listenToMessageEvent);
  }, [onComplete, transaction]);

  useEffect(() => {
    if (result) {
      window.open(
        `http://localhost:3000/iframe.html#/request-sign/${chrome.runtime.id}/${result.userOpHash}/${result.credentialId}`
      );
    }
  }, [result]);

  useEffect(() => {
    callAccountApi('getUserOpHashToSignAndCredentialId', [transaction]);
  }, [callAccountApi, transaction]);

  return (
    <CardContent>
      <Typography variant="h3" gutterBottom>
        Awaiting Signature
      </Typography>
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
    </CardContent>
  );
};

export default Transaction;
