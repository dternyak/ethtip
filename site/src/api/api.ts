import axios from 'axios';

export function checkTwitterUserNameAvailability(name: string) {
  const endpoint =
    'https://us-central1-eip-712.cloudfunctions.net/corsEnabledTwitterUserNameCheck';
  return axios.post(endpoint, { name });
}
