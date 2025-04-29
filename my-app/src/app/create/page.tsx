'use client';

import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Grid, FormControlLabel, Checkbox } from '@mui/material';
import axios from 'axios';

export default function SubmitDocumentPage() {
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
      console.error('Error submitting document:', error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Submit New Document</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/** Form Fields */}
          <Grid item xs={12} sm={6}>
            <TextField label="Regulation Name" name="regulation_name" fullWidth value={formData.regulation_name} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Jurisdiction" name="jurisdiction" fullWidth value={formData.jurisdiction} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Effective Date" name="effective_date" type="date" InputLabelProps={{ shrink: true }} fullWidth value={formData.effective_date} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Last Updated" name="last_updated" type="date" InputLabelProps={{ shrink: true }} fullWidth value={formData.last_updated} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Description" name="description" fullWidth multiline rows={3} value={formData.description} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Document Type" name="document_type" fullWidth value={formData.document_type} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Original URL" name="original_url" fullWidth value={formData.original_url} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="HTML URL" name="html_url" fullWidth value={formData.html_url} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="S3 URL" name="s3_url" fullWidth value={formData.s3_url} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="User ID" name="user_id" fullWidth value={formData.user_id} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="File Hash" name="file_hash" fullWidth value={formData.file_hash} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={formData.community_status} onChange={handleChange} name="community_status" />}
              label="Community Status"
            />
            <FormControlLabel
              control={<Checkbox checked={formData.processed_status} onChange={handleChange} name="processed_status" />}
              label="Processed Status"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
