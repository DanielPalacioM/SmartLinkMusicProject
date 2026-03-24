import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bmwmvxseoobjazbwkrol.supabase.co';
const SUPABASE_KEY = 'sb_publishable_qXtF6iujdkUULp4dIlv5eA_mbYYIK6J';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
