import { Box, Card as MuiCard, Link, Toolbar as MuiToolbar, Typography, withStyles } from '@material-ui/core';
import { Check as MuiCheck, Close as MuiClose, HelpOutline, LinkSharp } from '@material-ui/icons';
import { map, pipe, prop, sortBy } from 'ramda';
import React, { FC, Fragment, ReactNode, useState } from 'react';

import { DesignKit, FrameworkFeaturesById, SuperString } from '../entities';
import { noValue } from '../utils';

export const scrollIntoView = (scrollId: string) => () => {
  let element = null;
  try {
    element = document.querySelector(`#${scrollId}`);
  } catch {}

  if (!element) {
    window.history.pushState('', '/', window.location.pathname);
    return;
  }

  window.parent.location.hash = scrollId;
  element.scrollIntoView();
};

export const LinkIcon = withStyles({
  root: {
    cursor: 'pointer',
    fontSize: '1.25em',
    left: '-1em',
    opacity: 0.5,
    position: 'absolute',
    top: '15%',
    transform: 'rotate(-45deg)',
  },
})(LinkSharp);

export const TitleSection = withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: '1em 0',
  },
})(Box);

export const TitleWrapper = withStyles({
  root: {
    '&:hover': {
      cursor: 'pointer',
    },
    alignItems: 'center',
    display: 'flex',
    position: 'relative',
  },
})(Box);

export const Title = withStyles({
  root: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
})(Typography);

export const Toolbar = withStyles({
  root: {
    paddingLeft: 24,
  },
})(MuiToolbar);

interface GroupTitleProps {
  actions?: ReactNode;
  scrollId: string;
  subtitle?: SuperString;
  title: string;
}

export const GroupTitle: FC<GroupTitleProps> = ({ title, scrollId, subtitle, actions }) => {
  const subtitleSection = subtitle !== undefined && (
    <Typography variant="subtitle2">
      {typeof subtitle === 'string' ? subtitle : subtitle.jsx}
    </Typography>
  );

  const [showLink, setShowLink] = useState(false);

  const onMouseEnter = () => {
    setShowLink(true);
  };

  const onMouseLeave = () => {
    setShowLink(false);
  };

  const onClick = scrollIntoView(scrollId);

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Toolbar>
        <TitleSection>
          <TitleWrapper onClick={onClick}>
            <Title onClick={onClick} variant="h5">{title}</Title>
            {showLink && <LinkIcon onClick={onClick} />}
          </TitleWrapper>
          {subtitleSection}
        </TitleSection>
        {actions}
      </Toolbar>
    </div>
  );
};

export const Check = withStyles({
  root: {
    fill: 'green',
  },
})(MuiCheck);

export const Close = withStyles({
  root: {
    fill: 'red',
  },
})(MuiClose);

export const checkmark = (value: boolean | undefined) => {
  if (value === undefined) {
    return <HelpOutline />;
  }

  if (value) {
    return <Check />;
  }
  return noValue;
  // return null;
};

export const stringArray = (sizes: string[] | null) => (sizes ? sizes.sort().join(', ') : noValue);

export const designKits = (designKits: FrameworkFeaturesById['designKits']) => (designKits === false ? checkmark(false) : (
  pipe<DesignKit[], DesignKit[], ReactNode[], ReactNode>(
    sortBy(prop('type')),
    map(({ href, type }) => (
      <Link href={href} key={type} style={{ marginRight: 8 }}>{type}</Link>
    )),
    kits => <Fragment key="kits">{kits}</Fragment>,
  )(designKits)
));

export const themer = (themer: FrameworkFeaturesById['themer']) => (themer === false ? checkmark(themer) : (
  <Link href={themer as unknown as string}>Link</Link>
));

export const Card = withStyles(theme => ({
  root: {
    margin: '2em',
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1),
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
}))(MuiCard);
