'use client';

import { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';

export default function DocumentsPage() {
  const [formData, setFormData] = useState({
    regulation_name: '',
    jurisdiction: '',
    effective_date: '',
    last_updated: '',
    description: '',
    document_type: '',
    original_url: '',
    html_url: '',
    s3_url: '',
    user_id: '',
    community_status: false,
    file_hash: '',
    processed_status: false,
  });

  const [documents, setDocuments] = useState([]);

  // Fetch documents on mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get('/api/documents');
      setDocuments(res.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post('/api/documents', formData);
      fetchDocuments();
      setFormData({
        regulation_name: '',
        jurisdiction: '',
        effective_date: '',
        last_updated: '',
        description: '',
        document_type: '',
        original_url: '',
        html_url: '',
        s3_url: '',
        user_id: '',
        community_status: false,
        file_hash: '',
        processed_status: false,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Regulatory Documents
      </Typography>

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, mb: 6 }}>
        <Grid container spacing={2}>
          {[
            { name: 'regulation_name', label: 'Regulation Name' },
            { name: 'jurisdiction', label: 'Jurisdiction' },
            { name: 'effective_date', label: 'Effective Date', type: 'date' },
            { name: 'last_updated', label: 'Last Updated', type: 'date' },
            { name: 'description', label: 'Description' },
            { name: 'document_type', label: 'Document Type' },
            { name: 'original_url', label: 'Original URL' },
            { name: 'html_url', label: 'HTML URL' },
            { name: 's3_url', label: 'S3 URL' },
            { name: 'user_id', label: 'User ID' },
            { name: 'file_hash', label: 'File Hash' }
          ].map(({ name, label, type }) => (
            <Grid item xs={12} sm={6} key={name}>
              <TextField
                fullWidth
                label={label}
                name={name}
                type={type || 'text'}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                InputLabelProps={type === 'date' ? { shrink: true } : undefined}
              />
            </Grid>
          ))}

          {/* Checkbox fields */}
          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              <label>
                <input
                  type="checkbox"
                  name="community_status"
                  checked={formData.community_status}
                  onChange={handleChange}
                />
                Community Status
              </label>
              <label>
                <input
                  type="checkbox"
                  name="processed_status"
                  checked={formData.processed_status}
                  onChange={handleChange}
                />
                Processed Status
              </label>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* List Documents */}
      <Grid container spacing={3}>
        {documents.map((doc: any) => (
          <Grid item xs={12} key={doc.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{doc.regulation_name}</Typography>
                <Typography variant="body2">{doc.description}</Typography>
                <Typography variant="caption">Jurisdiction: {doc.jurisdiction}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
