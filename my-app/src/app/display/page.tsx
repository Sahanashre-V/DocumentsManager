'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import axios from 'axios';

export default function DocumentsTablePage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/documents');
      setDocuments(res.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>
        Documents
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Regulation Name</TableCell>
                <TableCell>Jurisdiction</TableCell>
                <TableCell>Effective Date</TableCell>
                <TableCell>Last Updated</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Document Type</TableCell>
                <TableCell>Original URL</TableCell>
                <TableCell>HTML URL</TableCell>
                <TableCell>S3 URL</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Community Status</TableCell>
                <TableCell>File Hash</TableCell>
                <TableCell>Processed Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.id}</TableCell>
                  <TableCell>{doc.regulation_name}</TableCell>
                  <TableCell>{doc.jurisdiction}</TableCell>
                  <TableCell>{doc.effective_date}</TableCell>
                  <TableCell>{doc.last_updated}</TableCell>
                  <TableCell>{doc.description}</TableCell>
                  <TableCell>{doc.document_type}</TableCell>
                  <TableCell>
                    <a href={doc.original_url} target="_blank" rel="noopener noreferrer">
                      Link
                    </a>
                  </TableCell>
                  <TableCell>
                    <a href={doc.html_url} target="_blank" rel="noopener noreferrer">
                      Link
                    </a>
                  </TableCell>
                  <TableCell>
                    <a href={doc.s3_url} target="_blank" rel="noopener noreferrer">
                      Link
                    </a>
                  </TableCell>
                  <TableCell>{doc.user_id}</TableCell>
                  <TableCell>{doc.community_status ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{typeof doc.file_hash === 'string' ? doc.file_hash : 'N/A'}</TableCell>
                  <TableCell>{doc.processed_status ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
