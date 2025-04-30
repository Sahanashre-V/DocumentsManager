'use client';

import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
        py: 4
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={2}
          sx={{
            p: 5,
            borderRadius: 2,
            textAlign: 'center',
            background: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              height: 5, 
              bgcolor: 'primary.main' 
            }} 
          />
          
          <Typography 
            variant="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              color: 'primary.main',
              mt: 2
            }}
          >
            Welcome to the Documents Manager
          </Typography>

          <Typography 
            variant="h6" 
            color="textSecondary" 
            sx={{ mb: 5 }}
          >
            Easily add and view important regulation documents.
          </Typography>

          <Box 
            display="flex" 
            justifyContent="center" 
            gap={4}
            sx={{
              flexWrap: { xs: 'wrap', sm: 'nowrap' }
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => router.push('/create')}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 500,
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                '&:hover': {
                  boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Add Document
            </Button>

            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => router.push('/display')}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 500,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  bgcolor: 'rgba(25, 118, 210, 0.04)'
                }
              }}
            >
              View Documents
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}