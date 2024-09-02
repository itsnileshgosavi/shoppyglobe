import footer_logo from '../assets/img/logo_big.png'
import insta_icon from '../assets/img/instagram_icon.png'
import wp_icon from '../assets/img/whatsapp_icon.png'

//Footer Component

const Footer = () => {
  return (
    <footer className='flex flex-col items-center w-[99vw] overflow-hidden'>
        <div className="flex md:my-5 my-1 items-center justify-center">
            <img src={footer_logo} className='h-10 w-10 md:h-20 md:w-20' alt="footer logo" />
            <p className='font-bold text-lg md:text-3xl'>ShoppyGlobe</p>
        </div>
        <ul className='flex space-x-5 text-sm md:text-2xl'>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <ul className='flex my-3 space-x-5'>
            <li><a href="https://www.instagram.com" target='_blank'><img src={insta_icon} className='w-7 h-7 md:h-12 md:w-12' alt="instagram social link" /></a></li>
            <li><a href="https://www.whatsapp.com" target='_blank'><img src={wp_icon} className='w-7 h-7 md:h-12 md:w-12' alt="facebook social link" /></a></li>
            <li><a href="https://www.facebook.com" target='_blank'><img alt="svgImg"  className='w-7 h-7 md:h-12 md:w-12' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCI+CjxwYXRoIGQ9Ik0gOSA0IEMgNi4yNTA0ODM5IDQgNCA2LjI1MDQ4MzkgNCA5IEwgNCA0MSBDIDQgNDMuNzQ5NTE2IDYuMjUwNDgzOSA0NiA5IDQ2IEwgMjUuODMyMDMxIDQ2IEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAyNi4xNTgyMDMgNDYgTCAzMS44MzIwMzEgNDYgQSAxLjAwMDEgMS4wMDAxIDAgMCAwIDMyLjE1ODIwMyA0NiBMIDQxIDQ2IEMgNDMuNzQ5NTE2IDQ2IDQ2IDQzLjc0OTUxNiA0NiA0MSBMIDQ2IDkgQyA0NiA2LjI1MDQ4MzkgNDMuNzQ5NTE2IDQgNDEgNCBMIDkgNCB6IE0gOSA2IEwgNDEgNiBDIDQyLjY2ODQ4NCA2IDQ0IDcuMzMxNTE2MSA0NCA5IEwgNDQgNDEgQyA0NCA0Mi42Njg0ODQgNDIuNjY4NDg0IDQ0IDQxIDQ0IEwgMzMgNDQgTCAzMyAzMCBMIDM2LjgyMDMxMiAzMCBMIDM4LjIyMDcwMyAyMyBMIDMzIDIzIEwgMzMgMjEgQyAzMyAyMC40NDI1MDggMzMuMDUzMDUgMjAuMzk4OTI5IDMzLjI0MDIzNCAyMC4yNzczNDQgQyAzMy40Mjc0MTkgMjAuMTU1NzU4IDM0LjAwNTgyMiAyMCAzNSAyMCBMIDM4IDIwIEwgMzggMTQuMzY5MTQxIEwgMzcuNDI5Njg4IDE0LjA5NzY1NiBDIDM3LjQyOTY4OCAxNC4wOTc2NTYgMzUuMTMyNjQ3IDEzIDMyIDEzIEMgMjkuNzUgMTMgMjcuOTAxNTg4IDEzLjg5NjQ1MyAyNi43MTg3NSAxNS4zNzUgQyAyNS41MzU5MTIgMTYuODUzNTQ3IDI1IDE4LjgzMzMzMyAyNSAyMSBMIDI1IDIzIEwgMjIgMjMgTCAyMiAzMCBMIDI1IDMwIEwgMjUgNDQgTCA5IDQ0IEMgNy4zMzE1MTYxIDQ0IDYgNDIuNjY4NDg0IDYgNDEgTCA2IDkgQyA2IDcuMzMxNTE2MSA3LjMzMTUxNjEgNiA5IDYgeiBNIDMyIDE1IEMgMzQuMDc5MDYyIDE1IDM1LjM4NzM2IDE1LjQ1ODQ1NSAzNiAxNS43MDExNzIgTCAzNiAxOCBMIDM1IDE4IEMgMzMuODQ5MTc4IDE4IDMyLjkyNjk1NiAxOC4wOTUyIDMyLjE1MDM5MSAxOC41OTk2MDkgQyAzMS4zNzM4MjYgMTkuMTA0MDI0IDMxIDIwLjA2MTQ5MiAzMSAyMSBMIDMxIDI1IEwgMzUuNzc5Mjk3IDI1IEwgMzUuMTc5Njg4IDI4IEwgMzEgMjggTCAzMSA0NCBMIDI3IDQ0IEwgMjcgMjggTCAyNCAyOCBMIDI0IDI1IEwgMjcgMjUgTCAyNyAyMSBDIDI3IDE5LjE2NjY2NyAyNy40NjQwODggMTcuNjQ2NDUzIDI4LjI4MTI1IDE2LjYyNSBDIDI5LjA5ODQxMiAxNS42MDM1NDcgMzAuMjUgMTUgMzIgMTUgeiI+PC9wYXRoPgo8L3N2Zz4="/></a></li>
        </ul>
        <div className='md:text-md text-sm my-2'>Copyright 2024. All rights reserved.</div>
    </footer>
  )
}

export default Footer