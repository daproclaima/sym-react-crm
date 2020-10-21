<?php


namespace App\Events;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Customer;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class CustomerUserSubscriber implements EventSubscriberInterface
{
    /**
     * @var Security
     */
    private $security;

    /**
     * CustomerUserSubscriber constructor.
     * @param Security $security
     */
    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    /**
     * @return array|array[]
     */
    public static function getSubscribedEvents()
    {
       return [
           KernelEvents::VIEW => ['setUserForCustomer', EventPriorities::PRE_VALIDATE ]
       ];
    }

    /**
     * @param ViewEvent $event
     */
    public function setUserForCustomer(ViewEvent $event)
    {
        $result = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if ($result instanceof Customer && $method === 'POST') {
            $user = $this->security->getUser();
            $result->setUser($user);
        }
    }

}