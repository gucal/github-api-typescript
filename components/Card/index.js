import styled from 'styled-components'

const Card = styled.div`
  border-radius: 6px;
  box-shadow: 0 0 0 1px rgb(53 72 91 / 7%);
  padding: ${({ space }) => `${space / 2}rem`};
  width: ${({ width }) => `${width}`};
`

export default Card
