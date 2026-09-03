import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Download } from 'lucide-react'
import { personal } from '@/lib/data'

export const metadata: Metadata = {
  title: `Resume | ${personal.name}`,
  description: `Resume of ${personal.name} – view or download the PDF.`,
}

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] px-5 py-8 text-[#202033] sm:px-10 sm:py-12">
      {/* Top bar */}
      <div className="mx-auto mb-6 flex max-w-5xl items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-black text-violet-700 hover:text-violet-500 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to portfolio
        </Link>

        <a
          href="/raja-resume.pdf"
          download
          className="inline-flex items-center gap-2 rounded-full bg-violet-700 px-5 py-2 text-xs font-black text-white shadow-lg shadow-violet-700/30 hover:bg-violet-600 transition-colors"
        >
          <Download size={13} />
          Download PDF
        </a>
      </div>

      {/* PDF viewer */}
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl shadow-2xl shadow-[#202033]/15">
        <iframe
          src="/raja-resume.pdf"
          className="h-[85vh] w-full"
          title={`${personal.name} – Resume`}
        />
      </div>
    </main>
  )
}
