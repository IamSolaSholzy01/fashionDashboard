import { useState } from 'react';

// Chakra imports
import { Box, useColorModeValue, Heading } from '@chakra-ui/react';
// Layout components
// import { SidebarContext } from 'contexts/SidebarContext';

// Custom Chakra theme
const Auth: JSX.Element = () => {
	// states and functions
	const [ toggleSidebar, setToggleSidebar ] = useState(false); 
	const getRoute = () => {
		return window.location.pathname !== '/auth/full-screen-maps';
	};

	const authBg = useColorModeValue('white', 'navy.900');
	document.documentElement.dir = 'ltr';
	return (
		<Box>
			{/*<SidebarContext.Provider*/}
				value={{
					toggleSidebar,
					setToggleSidebar
				}}>
				<Box
					bg={authBg}
					float='right'
					minHeight='100vh'
					height='100%'
					position='relative'
					w='100%'
					transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
					transitionDuration='.2s, .2s, .35s'
					transitionProperty='top, bottom, width'
					transitionTimingFunction='linear, linear, ease'>
                  ' />

						</Box>
					) : null}
				</Box>
			// </SidebarContext.Provider>
		</Box>
	);
}

export default Auth