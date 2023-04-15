import { Button } from '@components/core'
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Team = () => {
  return (
    <>
      <TeamHeader />
      <div>
        <Button>
          Create{' '}
          <FontAwesomeIcon icon={regular('plus')} aria-hidden='true' className='text-white' />
        </Button>
      </div>
    </>
  )
}

const TeamHeader = () => {
  return (
    <div className='bg-white border-b border-gray-100 p-4'>
      <h1>Team name</h1>
    </div>
  )
}

export default Team
