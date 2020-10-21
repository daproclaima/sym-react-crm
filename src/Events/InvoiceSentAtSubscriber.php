<?php


namespace App\Events;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class InvoiceSentAtSubscriber implements EventSubscriberInterface
{
    /**
     * @var Security
     */
    private $security;

    /**
     * @var InvoiceRepository
     */
    private $invoiceRepository;

    /**
     * InvoiceChronoSubscriber constructor.
     * @param Security $security
     * @param InvoiceRepository $invoiceRepository
     */
    public function __construct(Security $security, InvoiceRepository $invoiceRepository)
    {
        $this->security = $security;
        $this->invoiceRepository = $invoiceRepository;
    }

    /**
     * @return array|array[]
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setSentAtForInvoice', EventPriorities::PRE_VALIDATE ]
        ];
    }

    public function setSentAtForInvoice(ViewEvent $event) {
        $result = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if ($result instanceof Invoice && $method === "POST" && empty($result->getSentAt())) {
            $result->setSentAt(new \DateTime());
        }
    }

}