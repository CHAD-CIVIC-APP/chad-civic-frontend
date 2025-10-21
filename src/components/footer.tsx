'use client'

import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations()

  return (
    <footer className="border-t py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground">
          © 2025 {t('footer.about')}. {t('footer.rights')}.
        </p>
      </div>
    </footer>
  )
}


