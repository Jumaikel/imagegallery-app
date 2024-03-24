import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://wfjqlytnczdnfzsaifuo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmanFseXRuY3pkbmZ6c2FpZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyMTEyMDEsImV4cCI6MjAyNjc4NzIwMX0.K5tnmvRo-s_xf_7X7eTs3LX7wo6VEV2h8ZCR5EVnO14';

export const supabase = createClient(supabaseUrl, supabaseKey);
