import { Fragment } from 'react'
import { Dialog as HDialog, Transition } from '@headlessui/react'

type DialogProps = {
  title: string | null
  children: React.ReactNode
  show: boolean
  width: string
  handleCloseOutside: Function
}

const Dialog = ({title, children, show, width, handleCloseOutside}: DialogProps) => {
  const style = `transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ${width}`.trim()
  return (
    <Transition appear show={show} as={Fragment}>
      <HDialog as="div" className="relative z-10" onClose={() => handleCloseOutside()} static>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HDialog.Panel className={style}>
                <HDialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </HDialog.Title>
                <div className="mt-4">
                  {children}
                </div>
              </HDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HDialog>
    </Transition>
  )
}

Dialog.defaultProps = {
  title: 'Title',
  children: 'Body',
  show: false,
  width: 'w-full max-w-md',
  handleCloseOutside: (): void => {}
}

export default Dialog