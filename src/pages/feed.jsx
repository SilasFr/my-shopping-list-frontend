import { Box, Container, Paper, Stack, Typography } from '@mui/material';

const example = [
  'lista1',
  'lista2',
  'lista3',
  'lista4',
  'lista5',
  'lista6',
  'lista7',
  'lista8',
];

export default function Feed() {
  return (
    <Container sx={{ width: '100%', border: '1px solid red' }}>
      <Typography sx={{ margin: '0 0 5px 0' }}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      </Typography>
      <Box sx={styles.container}>
        <Stack spacing={2}>
          {example.map((list) => {
            return <Paper sx={styles.item}>list</Paper>;
          })}
        </Stack>
      </Box>
    </Container>
  );
}

const styles = {
  container: {
    width: '100%',
  },
  item: {
    textAlign: 'center',
    cursor: 'pointer',

    width: '100%',
    minHeight: '50px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
