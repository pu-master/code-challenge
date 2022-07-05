import { useEffect, useRef, useState } from 'react'
import { Button } from '@mantine/core'
import { useClickOutside, useResizeObserver } from '@mantine/hooks'
import styles from './DocumentDisplay.module.scss'

type Props = {
  documents: string[];
}

const DocumentDisplay = ({ documents }: Props) => {
  const [stacked, setStacked] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const thresholdWidth = useRef<number>(0)

  // Listen for outside click events.
  const wrapperRef = useClickOutside(() => {
    setExpanded(false)
  })

  const [listRef, listRect] = useResizeObserver<HTMLDivElement>()
  const [lastDocumentRef, lastDocumentRect] = useResizeObserver<HTMLDivElement>()

  useEffect(() => {
    if (!listRef.current
      || !listRect.width
      || !lastDocumentRef.current
      || !lastDocumentRect.width
      || stacked) {
      return
    }

    // Calculate the width of actual contents.
    const childWidth = lastDocumentRef.current.offsetLeft
      + lastDocumentRect.width
      + lastDocumentRect.left * 2 // For left and right-side paddings
      + 2 // For left and right-side borders

    // If children are overflown.
    if (childWidth > listRect.width) {
      setStacked(true)
      thresholdWidth.current = childWidth
    }
  }, [listRef, listRect, lastDocumentRef, lastDocumentRect, stacked])

  useEffect(() => {
    // If already stacked, check if it needs to be un-stacked.
    if (stacked
      && thresholdWidth.current
      && listRect.width >= thresholdWidth.current) {
      setStacked(false)
    }
  }, [stacked, listRect, thresholdWidth])

  // Expand/collapse a list of documents.
  const handleToggle = () => {
    setExpanded(!expanded)
  }

  let wrapperClass = styles['document-display']
  if (stacked) {
    wrapperClass = `${wrapperClass} stacked`
  }
  if (expanded) {
    wrapperClass = `${wrapperClass} expanded`
  }

  return (
    <div
      ref={wrapperRef}
      className={wrapperClass}
    >
      <div ref={listRef}>
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
              documents.map((document, index) => (
                <span
                  key={document}
                  ref={index === documents.length - 1 ? lastDocumentRef : undefined}
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
    </div>
  )
}

export default DocumentDisplay
