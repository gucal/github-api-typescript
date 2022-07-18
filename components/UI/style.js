import styled from "styled-components";
import { colors, fonts } from "./theme";

export const Input = styled.input`
  height: 2.4rem;
  outline: 0;
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  font-size: ${fonts.md};
  color: ${colors.primaryTextColor};
  padding: 0.2rem 0.6rem;
`;

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
  width: ${({ block }) => block && "100%"};
`;

export const Container = styled.div`
  max-width: 1440px;
  width: 100%;
`;

export const Flex = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: ${({ flexDirection }) => `${flexDirection}`};
  width: 100%;
  gap: ${({ gap }) => `${gap}px`};
`;

export const Card = styled.div`
  border-radius: 6px;
  box-shadow: 0 0 0 1px rgb(53 72 91 / 7%);
  padding: ${({ space }) => `${space / 2}rem`};
  width: ${({ width }) => `${width}`};
`;

export const Title = styled.span`
  font-size: ${fonts.xxl};
  color: ${colors.primaryTextColor};
  font-weight: 700;
`;

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0 0 1.5rem;
`;

export const FormLabel = styled.label`
  font-size: ${fonts.md};
  color: ${colors.secondaryTextColor};
`;

export const FormErrorLabel = styled.p`
  font-size: ${fonts.sm};
  color: ${colors.primary};
`;
