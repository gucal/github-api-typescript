import styled from 'styled-components'
import { colors, fonts } from '../../styles/theme'

const AlertArea = styled.div`
  padding: 1rem;
  color: ${({ type }) => (type == 'success' ? colors.secondaryTextColor : '#fff')};
  font-weight: 400;
  font-size: ${fonts.md};
  background: ${({ type }) => (type == 'success' ? colors.success : colors.error)};
  border-radius: 4px;
`

export default AlertArea
