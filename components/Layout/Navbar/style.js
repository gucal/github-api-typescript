import styled from "styled-components";

const NavbarArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4rem;
  background: #333;
  padding: 0 1.5rem;
`;

export const NavbarStartArea = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const NavbarEndArea = styled.div`
  display: flex;
  align-items: center;
`;

export const NavbarItem = styled.a`
  font-size: 0.85rem;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`;

export default NavbarArea;
