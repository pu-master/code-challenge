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

  useEffect(() => {
    if (!listRef.current || !listRect.width || stacked) {
      return
    }

    const documentList = listRef.current.querySelector(`.${styles['document-list']}`)
    if (!documentList) {
      return
    }

    const childNodes = documentList.childNodes
    if (!childNodes.length) {
      return
    }

    // Calculate the width of actual contents.
    let childWidth = 0
    childNodes.forEach((child) => {
      childWidth += (child as HTMLElement).offsetWidth
    })
    // 8px is a margin between documents.
    childWidth += 8 * (childNodes.length - 1)

    // If children are overflown.
    if (childWidth > listRect.width) {
      setStacked(true)
      thresholdWidth.current = childWidth
    }
  }, [listRef, listRect]) // eslint-disable-line

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
    </div>
  )
}

export default DocumentDisplay
