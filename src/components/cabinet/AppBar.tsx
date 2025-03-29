
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import PortraitIcon from '@mui/icons-material/Portrait';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useState } from 'react';
import MyData from './MyData';
import CalendarApp from '../calendar/CalendarApp';
import RepertuarList from '../repertuar/RepertuarList';
import Account from './Account';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const [openCalendar, setOpenCalendar] = useState("")
  const [openAccount, setOpenAccount] = useState("d-none")
  const [openList, setOpenList] = useState("d-none")

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleCalendarOpen = () => {
    setOpenCalendar("")
    setOpenAccount("d-none")
    setOpenList('d-none')
  }

  const handleCalendarClose = () => {
    setOpenCalendar("d-none")
    setOpenList('d-none')
  }

  const handleAccountOpen = () => {
    setOpenAccount("")
    setOpenCalendar("d-none")
    setOpenList('d-none')
  }

  const handleAccountClose = () => {
    setOpenAccount("d-none")
    setOpenCalendar("")
    setOpenList('d-none')
  }

  const handleListOpen = () => {
    setOpenList('')
    setOpenAccount("d-none")
    setOpenCalendar("d-none")
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          der Dirigent
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={() => handleCalendarOpen()}
                sx={[ {minHeight: 48, px: 2.5,},open ? { justifyContent: 'initial', } : { justifyContent: 'center', }, ]}  >
                <ListItemIcon
                  sx={[ {  minWidth: 0, justifyContent: 'center', }, open  ? {  mr: 3, } : { mr: 'auto', }, ]} >
                  <CalendarMonthIcon /> 
                </ListItemIcon>
                <ListItemText primary='Calendar'  sx={[  open ? { opacity: 1, } : { opacity: 0,}, ]}/>
              </ListItemButton>
            </ListItem>
            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={() => handleAccountOpen()}
                sx={[ {minHeight: 48, px: 2.5,},open ? { justifyContent: 'initial', } : { justifyContent: 'center', }, ]}  >
                <ListItemIcon
                  sx={[ {  minWidth: 0, justifyContent: 'center', }, open  ? {  mr: 3, } : { mr: 'auto', }, ]} >
                  <PortraitIcon /> 
                </ListItemIcon>
                <ListItemText primary='Account' sx={[ open ? { opacity: 1, } : { opacity: 0, }, ]}/>
              </ListItemButton>
            </ListItem>
            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={() => handleListOpen()}
                sx={[ {minHeight: 48, px: 2.5,},open ? { justifyContent: 'initial', } : { justifyContent: 'center', }, ]}  >
                <ListItemIcon
                  sx={[ {  minWidth: 0, justifyContent: 'center', }, open  ? {  mr: 3, } : { mr: 'auto', }, ]} >
                  <QueueMusicIcon /> 
                </ListItemIcon>
                <ListItemText primary='List' sx={[ open ? { opacity: 1, } : { opacity: 0, }, ]}/>
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <div className={openCalendar}>
          <CalendarApp />
        </div>
        <div className={openAccount}>
          <Account/>
        </div>
        <div className={openList}>
          <RepertuarList/>
        </div>
      </Box>
    </Box>
  );
}
