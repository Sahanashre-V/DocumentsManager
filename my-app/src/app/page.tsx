'use client';

import { Container, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h2" gutterBottom>
        Welcome to the Documents Manager
      </Typography>

      <Typography variant="h6" color="textSecondary" sx={{ mb: 5 }}>
        Easily add and view important regulation documents.
      </Typography>

      <Box display="flex" justifyContent="center" gap={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => router.push('/create')}
        >
          Add Document
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => router.push('/display')}
        >
          View Documents
        </Button>
      </Box>
    </Container>
  );
}
