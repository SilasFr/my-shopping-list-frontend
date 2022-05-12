import { useContext } from 'react';
import { UserContext } from '../contexts/userContext';

export default function useAuth() {
  const authContext = useContext(UserContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an User Context Provider');
  }

  return authContext;
}
