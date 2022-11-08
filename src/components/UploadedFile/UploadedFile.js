import { useContext } from 'react';
import styled from 'styled-components';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { TransactionContext } from '../../context/TransactionProvider';

const UploadedFileContainer = styled(Box)`
  margin-top: 16px;
`;

const HeadingTypography = styled(Typography)`
  margin-bottom: 8px;
`;

const CardContentStyled = styled(CardContent)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    padding: 0;
  }
`;

const CloudDoneOutlinedIconStyled = styled(CloudDoneOutlinedIcon)`
  color: ${({ theme }) => theme.palette.primary.dark};
`;

const FileTypography = styled(Typography)`
  margin: 0 8px;
  word-break: break-all;
`;

const UploadedFile = () => {
  const { filename, setFilename } = useContext(TransactionContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!filename) return null;

  const handleDelete = () => {
    setFilename(null);
  };

  return (
    <UploadedFileContainer>
      <HeadingTypography variant="h6">Uploaded File</HeadingTypography>
      <Card>
        <CardContentStyled>
          <CloudDoneOutlinedIconStyled
            fontSize={isMobile ? 'medium' : 'large'}
          />
          <FileTypography variant="body2">{filename}</FileTypography>
          <IconButton aria-label="delete file" onClick={handleDelete}>
            <DeleteOutlineOutlinedIcon
              fontSize={isMobile ? 'medium' : 'large'}
              onClick={() => console.log('delete icon')}
            />
          </IconButton>
        </CardContentStyled>
      </Card>
    </UploadedFileContainer>
  );
};

UploadedFile.propTypes = {};

UploadedFile.defaultProps = {};

export default UploadedFile;
