'use client';

import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  CircularProgress, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Box,
  Card,
  Chip
} from '@mui/material';
import axios from 'axios';

// Define the Document interface to match the structure from the API
interface Document {
  id: string | number;
  regulation_name: string;
  jurisdiction: string;
  effective_date: string;
  last_updated: string;
  description: string;
  document_type: string;
  original_url: string;
  html_url: string;
  s3_url: string;
  user_id: string | number;
  community_status: boolean;
  file_hash: string | null;
  processed_status: boolean;
}

export default function DocumentsTablePage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await axios.get<Document[]>('/api/documents');
      setDocuments(res.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="500" color="primary">
          Documents
        </Typography>
        
        <Card elevation={3}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper} elevation={0}>
              <Table sx={{ minWidth: 1200 }} size="medium" aria-label="documents table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Regulation Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Jurisdiction</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Effective Date</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Last Updated</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Document Type</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Original URL</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>HTML URL</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>S3 URL</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>User ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Community Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>File Hash</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Processed Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {documents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={14} align="center" sx={{ py: 3 }}>
                        No documents found
                      </TableCell>
                    </TableRow>
                  ) : (
                    documents.map((doc) => (
                      <TableRow 
                        key={doc.id}
                        sx={{ 
                          '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                          '&:hover': { backgroundColor: '#f1f1f1' }
                        }}
                      >
                        <TableCell>{doc.id}</TableCell>
                        <TableCell>{doc.regulation_name}</TableCell>
                        <TableCell>{doc.jurisdiction}</TableCell>
                        <TableCell>{doc.effective_date}</TableCell>
                        <TableCell>{doc.last_updated}</TableCell>
                        <TableCell>{doc.description}</TableCell>
                        <TableCell>{doc.document_type}</TableCell>
                        <TableCell>
                          <Chip 
                            label="Original" 
                            component="a"
                            href={doc.original_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            clickable
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label="HTML" 
                            component="a"
                            href={doc.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            clickable
                            size="small"
                            color="secondary"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label="S3" 
                            component="a"
                            href={doc.s3_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            clickable
                            size="small"
                            color="info"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>{doc.user_id}</TableCell>
                        <TableCell>
                          <Chip 
                            label={doc.community_status ? "Yes" : "No"} 
                            size="small"
                            color={doc.community_status ? "info" : "default"}
                          />
                        </TableCell>
                        <TableCell>{typeof doc.file_hash === 'string' ? doc.file_hash : 'N/A'}</TableCell>
                        <TableCell>
                          <Chip 
                            label={doc.processed_status ? "Yes" : "No"} 
                            size="small"
                            color={doc.processed_status ? "success" : "default"}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Card>
      </Box>
    </Container>
  );
}