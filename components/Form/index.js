import styled from 'styled-components'
import { colors, fonts } from '../../styles/theme'

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0 0 1.5rem;
`

export const FormLabel = styled.label`
  font-size: ${fonts.md};
  color: ${colors.secondaryTextColor};
`

export const FormErrorLabel = styled.label`
  font-size: ${fonts.sm};
  color: ${colors.primary};
`
