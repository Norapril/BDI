import { useViewport } from './viewportContext';
import MobileComponent from './MobileComponent';
import DesktopComponent from './DesktopComponent';

const Navigate = () => {
	const { width } = useViewport();
	const breakpoint = 760;
	return width < breakpoint ? <MobileComponent /> : <DesktopComponent />;
}

export default Navigate;
