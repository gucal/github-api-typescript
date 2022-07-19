import styled from 'styled-components'
import { colors } from '../../styles/theme'

const AlertArea = styled.div`
  padding: 1rem;
  color: ${colors.primaryTextColor};
  font-weight: 700;
  background: ${colors.error};
  border: 1px solid #ffccc7;
  border-radius: 4px;
`

export default AlertArea
