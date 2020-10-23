<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use App\Repository\InvoiceRepository;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=InvoiceRepository::class)
 * @ApiResource(
 *     subresourceOperations={
 *          "api_customers_invoices_get_subresource"={
 *              "normalization_context"={"groups"={"invoices_subresource"}}
 *          }
 *     },
 *     itemOperations={"get", "put", "delete",
 *          "increment"={
 *              "method"="post",
 *              "path"="/invoices/{id}/increment",
 *              "controller"="App\Controller\InvoiceIncrementationController",
 *              "openapi_context"={
 *                  "summary"="Increments an invoice",
 *                  "description"="Increments the chrono of a given invoice"
 *              }
 *          }
 *     },
 *     attributes={
 *          "pagination_enabled"=false,
 *          "pagination_items_per_page"=20,
 *          "order": {"sentAt ": "desc"}
 *     },
 *     normalizationContext={
 *          "groups"={"invoices_read"}
 *     },
 *     denormalizationContext={"disable_type_enforcement"=true}
 * )
 * @ApiFilter(
 *     OrderFilter::class,
 *     properties={
 *          "amount",
 *          "sentAt"
 *     }
 * )
 */
class Invoice
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * @Assert\Type(type="numeric", message="The invoice amount must be a number")
     * @Assert\NotBlank(message="The invoice amount field should not be blank")
     */
    private $amount;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * @Assert\Type (type="dateTime", message="the invoice sentAt field should be a DateTime type")
     * @Assert\NotBlank(message="The invoice sentAt field should not be blank")
     */
    private $sentAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * @Assert\Choice(choices={"SENT", "CANCELLED", "PAID"}, message="The invoice status must be either CANCELED, PAID or SENT")
     * @Assert\NotBlank(message="The invoice status field should not be blank")
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity=Customer::class, inversedBy="invoices")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"invoices_read"})
     * @Assert\NotBlank(message="The invoice customer field should not be blank")
     */
    private $customer;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * @Assert\Type(type="integer", message="The given invoice chrono type should be an integer")
     * @Assert\NotBlank(message="The invoice chrono field should not be blank")
     */
    private $chrono;

    /**
     * Return the User whom the invoice belongs to
     * @Groups({"invoices_read"})
     * @return User
     */
    public function getUser(): User
    {
        return $this->customer->getUser();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt(): ?DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt( $sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono(int $chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }
}
