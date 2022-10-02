import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAppContext } from '../context/app-context';
import styles from '../utils/starCardStyles';

const style = styles.parentBox;
const StarCard = () => {
  const { activeStarInfo, isModalOpened, closeModal } = useAppContext();
  const { type, variability, examples, description } = activeStarInfo;
  return (
    <Modal
      open={isModalOpened}
      onClose={closeModal}
      aria-labelledby={type}
      aria-describedby={`A ${type} with ${variability} variability`}
    >
      <Box sx={style}>
        {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        <Typography component='h1' sx={{ fontFamily: 'Barlow, sans-serif' }}>
          {type}
          {variability} variability
          {examples}
          <p dangerouslySetInnerHTML={{ __html: description }}></p>
        </Typography>
        <Box></Box>
        <Box></Box>
        <Box></Box>
      </Box>
    </Modal>
  );
};

export default StarCard;
