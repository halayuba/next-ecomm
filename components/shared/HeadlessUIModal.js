import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'

import { XMarkIcon } from '@heroicons/react/24/solid'

const HeadlessUIModal = ({ show, onClose, children, title }) => {
  let [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
    onClose();
  }

  useEffect(() => {
    setIsOpen(show)
  },[show])

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="fixed top-4 right-4">
                  <a href="#" onClick={closeModal}>
                    <XMarkIcon className="w-6 text-red-500" />
                  </a>
                </div>
                {title && (
                  <Dialog.Title
                    as="h3"
                    className="text-xl text-center font-medium leading-6 text-gray-900"
                  >
                    { title }
                  </Dialog.Title>
                )}

                <Dialog.Description as={Fragment}>
                  <div className="mt-2">
                    { children }
                  </div>
                </Dialog.Description>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default HeadlessUIModal