import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { HomePage } from '@/components/marketing/home';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: {
    absolute: 'Proofline — Good relationships. Clear next steps.',
  },
  description:
    'Rank open deals from your own records, see why each one matters, and approve the next step.',
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootPage() {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) redirect('/decisions');
    }
  } catch {
    // Continue to landing page if Supabase client cannot be initialized
  }

  return <HomePage />;
}
