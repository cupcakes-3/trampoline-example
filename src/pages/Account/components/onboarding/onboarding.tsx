import {
  Button,
  CardActions,
  CardContent,
  CircularProgress,
  FormControl,
  FormGroup,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import React, { useCallback, useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { OnboardingComponent, OnboardingComponentProps } from '../types';

const Onboarding: OnboardingComponent = ({
  accountName,
  onOnboardingComplete,
}: OnboardingComponentProps) => {
  useEffect(() => {
    const listenToMessageEvent = (q_values: any, sender: any) => {
      if (
        sender.url.includes('http://localhost:3000/iframe.html#/create-new')
      ) {
        console.log(q_values, 'q_values');
        onOnboardingComplete({
          q_values,
        });
      }
    };

    window.addEventListener('message', listenToMessageEvent);

    chrome.runtime.onMessageExternal.addListener(listenToMessageEvent);

    return () =>
      chrome.runtime.onMessageExternal.removeListener(listenToMessageEvent);
  }, [onOnboardingComplete]);

  useEffect(() => {
    window.open(
      `http://localhost:3000/iframe.html#/create-new/${chrome.runtime.id}/${accountName}/`
    );
  }, [accountName]);

  return (
    <>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          Awaiting Fingerprint
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
    </>
  );
};

export default Onboarding;
