import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button'
import Card from '../../components/Card/Card';
import Input from '../../components/Input/Input';
import NotificationContext from '../../context/NotifcationContext';
import socket from '../../socket/socket'
import { clearSessionStorage } from '../../storage/session';
import { useParams } from 'react-router-dom'
import { User } from '../../types/storage';
import FormItem from '../../components/FormItem/FormItem';

const Home = () => {
  const navigate = useNavigate();
  const {notificationHandler} = useContext(NotificationContext)
  // const [key, setKey] = useState<string>('')
  const [name, setName] = useState<string>('')
  const { roomId } = useParams()

  clearSessionStorage()

  const createRoom = () => {
    const form = {
      name
    }
    socket.emit('createRoom', form)
  }

  const joinRoom = () => {
    const form = {
      roomId,
      name
    }
    socket.emit('joinRoom', form)
  }

  useEffect(() => {
    socket.emit('removeUser')
    return
  }, [])

  useEffect(() => {
    socket.on('incorrectKey', () => {
      notificationHandler({
        type: 'danger',
        message: 'Secret key is incorrect',
        withIcon: true
      })
    })
    socket.on('getRoomId', (roomId: string) => {
      navigate(`/room/${roomId}`)
    })
    socket.on('roomIsFull', () => {
      notificationHandler({
        type: 'danger',
        message: 'Room is full',
        withIcon: true
      })
    })
    return () => {
      socket.off('incorrectKey');
      socket.off('getRoomId');
      socket.off('roomIsFull');
    }
  }, [socket])

  return (
    <div className='h-full flex justify-center items-center'>
      <Card>
        <div className='flex justify-center items-center w-[25rem]'>
          <div className="w-full">
            <h1 className='mb-4 text-center text-xl bold'>Genshin Impact Drafting System</h1>
            {/* {!roomId
            ?
              <FormItem>
                <Input name='Secret Key' value={key} onChange={(value: string) => setKey(value)} placeholder='Secret Key'></Input> 
              </FormItem>
            : */}
              <FormItem>
                <Input name='Username' value={name} onChange={(value: string) => setName(value)} placeholder='Username'></Input>
              </FormItem>
            {/* } */}
            <div>
            {roomId
              ? <Button block disabled={!name} onClick={() => joinRoom()}>Join Room</Button>
              : <Button block disabled={!name} onClick={() => createRoom()}>Create Room</Button>}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Home