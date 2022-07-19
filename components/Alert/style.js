import styled from 'styled-components'
import { colors, fonts } from '../../styles/theme'

const AlertArea = styled.div`
  padding: 1rem;
  color: #fff;
  font-weight: 400;
  font-size: ${fonts.md};
  background: ${colors.primary};
  border: 1px solid #d3d3d3;
  border-radius: 4px;
`

export default AlertArea
