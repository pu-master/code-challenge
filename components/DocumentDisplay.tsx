import { useEffect, useRef, useState } from 'react'
import { Button } from '@mantine/core'
import styles from './DocumentDisplay.module.scss'

type Props = {
  documents: string[];
}

const DocumentDisplay = ({ documents }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)

  // Listen for outside click events.
  useEffect(() => {
    function clickHandler(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains((event.target) as Node)) {
        setExpanded(false)
      }
    }

    document.addEventListener('mousedown', clickHandler)

    return () => {
      document.removeEventListener('mousedown', clickHandler)
    }
  }, [wrapperRef])

  // Expand/collapse a list of documents.
  const handleToggle = () => {
    setExpanded(!expanded)
  }

  return (
    <div
      ref={wrapperRef}
      className={`${styles['document-display']}${expanded ? ' expanded' : ''}`}
    >
      <Button
        size="xs"
        className={styles['document-toggle']}
        onClick={handleToggle}
      >
        Documents...
      </Button>
      <div className={styles['document-list-wrapper']}>
        <div className={styles['document-list']}>
          {
            documents.map(document => (
              <span
                key={document}
                className={styles.document}
                title={document}
              >
                { document }
              </span>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default DocumentDisplay
