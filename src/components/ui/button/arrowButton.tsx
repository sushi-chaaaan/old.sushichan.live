import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import Button, { ButtonProps } from '@/components/base/button'
import styles from '@/components/ui/button/arrow-button.module.scss'

type ArrowButtonProps = {
  showBackArrow?: boolean
  showForwardArrow?: boolean
} & ButtonProps

export default function ArrowButton({
  children,
  onClick,
  style,
  showBackArrow: showBack,
  showForwardArrow: showForward,
}: ArrowButtonProps) {
  return (
    <Button onClick={onClick} role="button" style={style}>
      <span className={styles.label}>
        {showBack && <FontAwesomeIcon icon={faAngleLeft} size="1x" />}
        {children}
        {showForward && <FontAwesomeIcon icon={faAngleRight} size="1x" />}
      </span>
    </Button>
  )
}
