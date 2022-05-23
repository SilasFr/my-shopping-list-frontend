import { v4 as uuid } from 'uuid';

export default function generateId() {
  const shortId = uuid().split('-')[0];
  return shortId;
}
