import { NextResponse } from 'next/server';
import { Xendit } from 'xendit-node';

const xenditClient = new Xendit({ secretKey: process.env.XENDIT_SECRET_KEY });
const { Invoice } = xenditClient;

export async function POST(request) {
  try {
    const { amount, userId } = await request.json();

    if (!amount || amount < 10000) {
      return NextResponse.json({ error: 'Minimal top up Rp 10.000' }, { status: 400 });
    }

    const externalId = `topup-${userId}-${Date.now()}`;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const invoiceResponse = await Invoice.createInvoice({
      data: {
        externalId: externalId,
        amount: Number(amount),
        description: `Top up Saldo User ${userId}`,
        currency: 'IDR',
        reminderTime: 1,
        successRedirectUrl: `${siteUrl}/status?status=success`,
        failureRedirectUrl: `${siteUrl}/status?status=failed`,
      }
    });

    return NextResponse.json({ invoiceUrl: invoiceResponse.invoiceUrl });

  } catch (error) {
    console.error('Xendit Error:', error);
    return NextResponse.json({ error: 'Gagal memproses pembuatan invoice' }, { status: 500 });
  }
}
