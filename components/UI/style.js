import styled from 'styled-components'
import { colors, fonts } from '../../styles/theme'

export const Container = styled.div`
  max-width: 1440px;
  width: 100%;
`

export const Input = styled.input`
  width: ${({ block }) => block && '100%'};
  height: 2.4rem;
  outline: 0;
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  font-size: ${fonts.md};
  color: ${colors.primaryTextColor};
  padding: 0.2rem 0.6rem;

  @media (max-width: 700px) {
    font-size: 1rem;
  }
`
export const Textarea = styled.textarea`
  font-family: unset;
  resize: vertical;
  width: ${({ block }) => block && '100%'};
  outline: 0;
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  font-size: ${fonts.md};
  color: ${colors.primaryTextColor};
  padding: 0.6rem;

  @media (max-width: 700px) {
    font-size: 1rem;
  }
`

export const Button = styled.button`
  height: 2.4rem;
  outline: 0;
  background: ${colors.primary};
  border-radius: 4px;
  border: 0;
  font-size: ${fonts.md};
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  padding: 0.2rem 0.6rem;
  width: ${({ block }) => block && '100%'};
`

export const Flex = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: ${({ flexDirection }) => `${flexDirection}`};
  width: 100%;
  gap: ${({ gap }) => `${gap}px`};
`

export const Title = styled.span`
  font-size: ${fonts.xxl};
  color: ${colors.primaryTextColor};
  font-weight: 700;
`
