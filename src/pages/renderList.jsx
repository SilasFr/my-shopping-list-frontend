import {
  Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import NumbersIcon from '@mui/icons-material/Numbers';
import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Box } from '@mui/system';

export default function RenderList() {
  const { id } = useParams();
  const { userData } = useAuth();
  const list = userData.lists.find((list) => list._id === id);

  console.log(list);

  return (
    <Container>
      <List spacing={1}>
        {list.list.map((item) => {
          const labelId = `checkbox-list-label-${item.product}`;
          return (
            <ListItem
              ket={labelId}
              disablePadding
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="price"
                  sx={{ display: 'flex', gap: '8px' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      border: '1px solid',
                      borderRadius: '5px',
                      padding: '1px 4px',
                    }}
                  >
                    <Typography>{item.qty}</Typography>
                    <NumbersIcon sx={{ fontSize: '1' }} />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      border: '1px solid',
                      borderRadius: '5px',
                      padding: '1px 4px',
                    }}
                  >
                    <Typography>{item.price}</Typography>
                    <PriceChangeIcon sx={{ fontSize: '1' }} />
                  </Box>
                </IconButton>
              }
            >
              <ListItemButton role={undefined} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>

                <ListItemText id={labelId} primary={item.product} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
}
