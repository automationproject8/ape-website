import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'APE Website <office@advancedproengineering.com>',
      to: 'office@advancedproengineering.com',
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f5f5; padding: 20px;">
          <div style="background: #1e3a5f; padding: 24px; border-radius: 8px 8px 0 0;">
            <img src="https://advancedproengineering.com/logo5-ape.png" alt="APE" style="height: 48px;" />
          </div>
          <div style="background: white; padding: 32px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1e3a5f; margin-top: 0;">New Contact Form Submission</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; width: 120px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333; font-weight: bold;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Company</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${company || 'Not provided'}</td>
              </tr>
            </table>

            <div style="margin-top: 24px;">
              <div style="color: #666; margin-bottom: 8px;">Message</div>
              <div style="background: #f9f9f9; padding: 16px; border-radius: 6px; border-left: 3px solid #1e3a5f; color: #333; line-height: 1.6;">
                ${message.replace(/\n/g, '<br/>')}
              </div>
            </div>

            <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
              Sent from advancedproengineering.com contact form
            </div>
          </div>
        </div>
      `,
    })

    // Also send a confirmation email to the person who submitted
    await resend.emails.send({
      from: 'Advanced Pro Engineering <office@advancedproengineering.com>',
      to: email,
      subject: 'We received your message — Advanced Pro Engineering',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f5f5; padding: 20px;">
          <div style="background: #1e3a5f; padding: 24px; border-radius: 8px 8px 0 0;">
            <img src="https://advancedproengineering.com/logo5-ape.png" alt="APE" style="height: 48px;" />
          </div>
          <div style="background: white; padding: 32px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1e3a5f; margin-top: 0;">Thank you, ${name}!</h2>
            <p style="color: #333; line-height: 1.6;">
              We've received your message and will get back to you as soon as possible, typically within 1–2 business days.
            </p>
            <p style="color: #333; line-height: 1.6;">
              In the meantime, feel free to explore our services at 
              <a href="https://advancedproengineering.com" style="color: #2d5a8e;">advancedproengineering.com</a>.
            </p>
            <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
              Advanced Pro Engineering · office@advancedproengineering.com · +40 779 312 760
            </div>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
