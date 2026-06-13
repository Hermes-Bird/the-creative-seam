import { createClient } from "@supabase/supabase-js";
import { env } from "cloudflare:workers";


export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY
);
