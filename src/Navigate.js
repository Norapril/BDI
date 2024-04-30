import { useViewport } from './viewportContext';
import MobileComponent from './MobileComponent';
import DesktopComponent from './DesktopComponent';
import React, { useEffect } from 'react';

const Navigate = () => {
	useEffect(() => {
		document.title = "BDI测试";
	  }, []);
	const { width } = useViewport();
	const breakpoint = 760;
	return width < breakpoint ? <MobileComponent /> : <DesktopComponent />;
}

export default Navigate;
