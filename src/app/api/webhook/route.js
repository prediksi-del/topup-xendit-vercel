import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const xenditCallbackToken = request.headers.get('x-callback-token');
    
    // Validasi token webhook demi keamanan agar API tidak ditembak sembarang orang
    if (xenditCallbackToken !== process.env.XENDIT_WEBHOOK_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized Webhook Token' }, { status: 401 });
    }

    const body = await request.json();
    
    if (body.status === 'PAID') {
      const externalId = body.external_id;
      const amount = body.amount;
      const userId = externalId.split('-')[1];

      // LOGIKA UTAMA DATABASE: 
      // Tambahkan logic kueri/mutasi penambahan saldo pengguna di sini.
      // Contoh: await db.user.update({ where: { id: userId }, data: { balance: { increment: amount } } })
      
      console.log(`[SUCCESS] Saldo untuk user ${userId} berhasil ditambahkan sebesar Rp ${amount}`);
    }

    // Selalu kirim respon OK ke Xendit agar tidak terjadi retrying request
    return NextResponse.json({ status: 'OK' });

  } catch (error) {
    console.error('Webhook Endpoint Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
