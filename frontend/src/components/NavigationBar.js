import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { useOktaAuth } from '@okta/okta-react';
const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;
export const NavigationBar = () => {
  const { authState, authService } = useOktaAuth();

  const login = async () => authService.login('/');
  const logout = async () => authService.logout('/');

  return (
      <Styles>
        <Navbar expand="lg">
          <Navbar.Brand href="/">ReliefFund</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
              {authState.isAuthenticated && (<Nav.Item><Nav.Link href="/regular">Regular</Nav.Link></Nav.Item>)}
              <Nav.Item><Nav.Link href="/spot">SpotDonate!</Nav.Link></Nav.Item>
              {authState.isAuthenticated && (<Nav.Item><Nav.Link href="/registerSpot">RegisterSpot</Nav.Link></Nav.Item>)}
              {authState.isAuthenticated && (<Nav.Item><Nav.Link href="/admin">Admin</Nav.Link></Nav.Item>)}
              {authState.isAuthenticated && (<Nav.Item><Nav.Link id="logout-button" as="a" onClick={logout}>Logout</Nav.Link></Nav.Item>)}
              {!authState.isPending && !authState.isAuthenticated && (<Nav.Item><Nav.Link as="a" onClick={login}>Login</Nav.Link></Nav.Item>)}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Styles>
  );
}