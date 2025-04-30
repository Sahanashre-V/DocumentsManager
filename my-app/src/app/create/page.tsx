'use client';

import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, FormControlLabel, Checkbox } from '@mui/material';
import axios from 'axios';
import Link from 'next/link'; 

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      alert("Document Added!!!")
    } catch (error) {
      console.error('Error submitting document:', error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="500" color="primary">Create Document</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {/** Form Fields */}
          <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
            <TextField label="Regulation Name" name="regulation_name" fullWidth value={formData.regulation_name} onChange={handleChange} required />
          </Box>
          <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
            <TextField label="Jurisdiction" name="jurisdiction" fullWidth value={formData.jurisdiction} onChange={handleChange} required />
          </Box>
          <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
            <TextField label="Effective Date" name="effective_date" type="date" InputLabelProps={{ shrink: true }} fullWidth value={formData.effective_date} onChange={handleChange} required />
          </Box>
          <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
            <TextField label="Last Updated" name="last_updated" type="date" InputLabelProps={{ shrink: true }} fullWidth value={formData.last_updated} onChange={handleChange} required />
          </Box>
          <Box sx={{ width: '100%' }}>
            <TextField label="Description" name="description" fullWidth multiline value={formData.description} onChange={handleChange} required />
          </Box>
          <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
            <TextField label="Document Type" name="document_type" fullWidth value={formData.document_type} onChange={handleChange} required />
          </Box>
          <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
            <TextField label="Original URL" name="original_url" fullWidth value={formData.original_url} onChange={handleChange} />
          </Box>
          <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
            <TextField label="HTML URL" name="html_url" fullWidth value={formData.html_url} onChange={handleChange} />
          </Box>
          <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
            <TextField label="S3 URL" name="s3_url" fullWidth value={formData.s3_url} onChange={handleChange} required />
          </Box>
          <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
            <TextField label="User ID" name="user_id" fullWidth value={formData.user_id} onChange={handleChange} required />
          </Box>
          <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
            <TextField label="File Hash" name="file_hash" fullWidth value={formData.file_hash} onChange={handleChange} />
          </Box>
          <Box sx={{ width: '100%' }}>
            <FormControlLabel
              control={<Checkbox checked={formData.community_status} onChange={handleChange} name="community_status" />}
              label="Community Status"
            />
            <FormControlLabel
              control={<Checkbox checked={formData.processed_status} onChange={handleChange} name="processed_status" />}
              label="Processed Status"
            />
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" sx={{ width: 'auto' }}>
            Add Document
          </Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Link href="/display">
            <Button variant="outlined" color="primary">
              View Documents
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}