<?php


namespace App\Controller;


use App\Entity\Invoice;
use Doctrine\ORM\EntityManagerInterface;

class InvoiceIncrementationController
{
    /**
     * @var EntityManagerInterface
     */
    private $manager;

    /**
     * InvoiceIncrementationController constructor.
     * @param EntityManagerInterface $manager
     */
    public function __construct(EntityManagerInterface $manager)
    {
        $this->manager = $manager;
    }
//  If I were doing a classic symfony route like so, it would work.
//  But we would not centralize this definition where all the others in the Resource.
//  So it would not be displayed on api dev page, neither explicitly shown to other devs.
//     * @Route("/api/invoices/{id}/increment")
//     * @param Invoice $data
//     */
    public function __invoke(Invoice $data)
    {
//        dd($data);
        $data->setChrono($data->getChrono() + 1);
        $this->manager->flush();
//        dd($data);
        return $data;
    }

}