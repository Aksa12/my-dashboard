import { useRef, useState, useContext, useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';

import { TransactionContext } from '../../context/TransactionProvider';

const FileContainer = styled(Box)`
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed ${({ theme }) => theme.palette.primary.dark};

  ${({ isDragActive, theme }) =>
    isDragActive &&
    css`
      background-color: ${theme.palette.primary.main}0a;
    `}

  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
  }
`;

const FileInput = styled.input`
  display: none;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InsertDriveFileOutlinedIconStyled = styled(FileCopyOutlinedIcon)`
  margin-bottom: 14px;
  color: ${({ theme }) => theme.palette.primary.dark};
  width: 50px;
  height: 50px;
`;

const ButtonStyled = styled(Button)`
  margin-top: 8px;
  color: ${({ theme }) => theme.palette.primary.dark};
`;

const DragDropFile = ({ changeHandler }) => {
  const inputRef = useRef(null);

  const { filename } = useContext(TransactionContext);

  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
      console.log('enter');
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
      console.log('leace');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log('hello', e.dataTransfer.files[0]);
      changeHandler({
        target: {
          files: e.dataTransfer.files,
        },
      });
    }
  };

  const onClickUpload = () => {
    inputRef?.current?.click();
  };

  useEffect(() => {
    if (!filename) {
      inputRef.current.value = '';
    }
  }, [filename]);

  return (
    <FileContainer
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      isDragActive={isDragActive}
    >
      <FileInput
        type="file"
        name="file"
        id="input-file-upload"
        accept=".csv"
        onChange={changeHandler}
        ref={inputRef}
      />
      <label htmlFor="input-file-upload">
        <Content draggable="false">
          <InsertDriveFileOutlinedIconStyled />
          <Typography>Drag and drop your file here or</Typography>
          <ButtonStyled variant="text" onClick={onClickUpload}>
            Upload a file
          </ButtonStyled>
        </Content>
      </label>
    </FileContainer>
  );
};

DragDropFile.propTypes = {
  changeHandler: PropTypes.func,
};

DragDropFile.defaultProps = {
  changeHandler: () => null,
};

export default DragDropFile;
